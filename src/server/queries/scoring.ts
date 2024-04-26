type ScoringRule = {
    action: string,
    points: number,
}

const EXACT_SCORE_RULE = {
    action: "exact_score",
    points: 5,
}

const CORRECT_WINNER_RULE = {
    action: "correct_winner",
    points: 2,
}


const SCORING_RULES: ScoringRule[] = [
    EXACT_SCORE_RULE,
    CORRECT_WINNER_RULE
]


async function getScoringRules() {
    return SCORING_RULES;
}

export {
    getScoringRules,
    EXACT_SCORE_RULE,
    CORRECT_WINNER_RULE
}; export type { ScoringRule };

