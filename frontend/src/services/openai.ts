export interface GeneratedTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: string;
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

    // Parsuj JSON z odpowiedzi
    const taskData = JSON.parse(content.trim());

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
