export interface GeneratedTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: string;
}

export interface TaskVerificationResult {
  verified: boolean;
  message: string;
}

export async function generateDailyTask(): Promise<GeneratedTask> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const prompt = `Wygeneruj jedno codzienne zadanie dla użytkownika aplikacji miejskiej "Karta Łodzianina" w Łodzi.
Zadanie powinno promować ekologiczne i zdrowe nawyki, korzystanie z komunikacji miejskiej, rowerów miejskich, uczestnictwo w wydarzeniach kulturalnych lub aktywność fizyczną.

Odpowiedz TYLKO w formacie JSON (bez żadnego dodatkowego tekstu):
{
  "title": "krótki tytuł zadania (max 50 znaków)",
  "description": "opis zadania zachęcający do działania (max 100 znaków)",
  "points": liczba_punktów_od_20_do_100,
  "icon": "jedno_emoji_pasujące_do_zadania"
}

Przykłady zadań:
- Skorzystaj dziś z roweru miejskiego
- Weź udział w wydarzeniu kulturalnym
- Przejedź się tramwajem zamiast autem
- Odwiedź jedno z łódzkich muzeów
- Zrób 10000 kroków dzisiaj`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Jesteś asystentem generującym codzienne zadania dla aplikacji miejskiej. Odpowiadasz TYLKO w formacie JSON, bez dodatkowego tekstu.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Usuń markdown code blocks jeśli są (```json ... ```)
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```\s*/g, '');
    }

    // Parsuj JSON z odpowiedzi
    const taskData = JSON.parse(cleanedContent.trim());

    // Walidacja i tworzenie zadania
    const task: GeneratedTask = {
      id: `task-${Date.now()}`,
      title: taskData.title || 'Nowe zadanie',
      description: taskData.description || 'Wykonaj dzisiejsze zadanie',
      points: taskData.points || 50,
      completed: false,
      icon: taskData.icon || '🎯',
    };

    return task;
  } catch (error) {
    console.error('Error generating task:', error);
    // Fallback task jeśli API nie działa
    return {
      id: `task-${Date.now()}`,
      title: 'Wybierz dziś komunikację miejską',
      description: 'Zrezygnuj z samochodu i jedź tramwajem lub autobusem',
      points: 50,
      completed: false,
      icon: '🚌',
    };
  }
}

export async function verifyTaskCompletion(
  taskTitle: string,
  taskDescription: string,
  imageFile: File
): Promise<TaskVerificationResult> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  // Logowanie dla debugowania
  console.log('🔍 Weryfikacja zadania:', {
    title: taskTitle,
    description: taskDescription,
    imageSize: `${(imageFile.size / 1024).toFixed(2)} KB`,
  });

  try {
    // Konwertuj obraz do base64
    const base64Image = await fileToBase64(imageFile);

    const prompt = `Jesteś asystentem weryfikującym wykonanie zadania w aplikacji miejskiej "Karta Łodzianina".

Zadanie użytkownika: "${taskTitle}"
Opis: "${taskDescription}"

Przeanalizuj przesłane zdjęcie i oceń, czy użytkownik RZECZYWIŚCIE wykonał to zadanie.

Przykłady weryfikacji:
- Jeśli zadanie to "Skorzystaj z komunikacji miejskiej" - szukaj zdjęć wnętrza tramwaju/autobusu, biletomatu, przystanku
- Jeśli zadanie to "Wypożycz rower miejski" - szukaj zdjęć roweru miejskiego, stacji rowerowej
- Jeśli zadanie to "Odwiedź park" - szukaj zdjęć z parku, zieleni, ławek
- Jeśli zadanie to "Weź udział w wydarzeniu kulturalnym" - szukaj zdjęć z muzeum, koncertu, teatru

Odpowiedz TYLKO w formacie JSON:
{
  "verified": true/false,
  "message": "Krótka wiadomość dla użytkownika (max 80 znaków)"
}

Jeśli zdjęcie pasuje do zadania: verified: true, message: "Świetnie! Zadanie zaliczone!"
Jeśli zdjęcie NIE pasuje: verified: false, message: "To zdjęcie nie potwierdza wykonania zadania. Spróbuj ponownie."`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Jesteś asystentem weryfikującym wykonanie zadań przez analizę zdjęć. Odpowiadasz TYLKO w formacie JSON.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    console.log('📨 Odpowiedź z OpenAI:', content);

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Usuń markdown code blocks jeśli są (```json ... ```)
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```\s*/g, '');
    }

    console.log('🧹 Oczyszczona odpowiedź:', cleanedContent);

    // Parsuj JSON z odpowiedzi
    const result = JSON.parse(cleanedContent.trim());

    console.log('✅ Wynik weryfikacji:', result);

    return {
      verified: result.verified || false,
      message: result.message || 'Nie udało się zweryfikować zadania.',
    };
  } catch (error) {
    console.error('Error verifying task:', error);
    return {
      verified: false,
      message: 'Wystąpił błąd podczas weryfikacji. Spróbuj ponownie.',
    };
  }
}

// Helper function to convert File to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
