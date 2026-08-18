import type {
  Player,
  Answer,
  Option,
  Question,
} from "@/generated/prisma/client";

type PlayerWithAnswers = Player & {
  answers: (Answer & { option: Option; question: Question })[];
};

export function getPlayerScore(players: PlayerWithAnswers[]) {
  if (players.length > 0) {
    const playerScore: { score: number; name: string }[] = [];

    players.forEach((player) => {
      let score = 0;
      const name = player.name;

      player.answers.forEach((answer) => {
        if (answer.option?.isCorrect === true) {
          score += answer.question.points;
        }
      });

      playerScore.push({
        score,
        name,
      });
    });

    return playerScore.sort((a, b) => b.score - a.score);
  }
}
