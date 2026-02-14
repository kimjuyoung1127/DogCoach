const LABEL_MAP: Record<string, string> = {
  Barking: "\uC9D6\uC74C",
  Biting: "\uC785\uC9C8",
  Toileting: "\uBC30\uBCC0",
  Anxiety: "\uBD84\uB9AC\uBD88\uC548",
  Excitement: "\uD765\uBD84",
  separation: "\uBD84\uB9AC\uBD88\uC548",
  barking: "\uC9D6\uC74C",
  potty: "\uBC30\uBCC0",
  destructive: "\uD30C\uAD34 \uD589\uB3D9",
  aggression: "\uACF5\uACA9\uC131",
  ignoring: "\uBB34\uC2DC \uD6C8\uB828",
  treat_reward: "\uAC04\uC2DD \uBCF4\uC0C1",
  clicker: "\uD074\uB9AC\uCEE4 \uD6C8\uB828",
  kennel: "\uCF04\uB12C \uC801\uC751",
  toy: "\uC7A5\uB09C\uAC10 \uD65C\uC6A9",
  sound_desensitization: "\uC18C\uB9AC \uB465\uAC10\uD654",
  nosework: "\uB178\uC988\uC6CC\uD06C",
  waiting: "\uAE30\uB2E4\uB9AC\uAE30",
  etc: "\uAE30\uD0C0",
  doorbell: "\uCD08\uC778\uC885 / \uB178\uD06C \uC18C\uB9AC",
  stranger: "\uB0AF\uC120 \uC0AC\uB78C \uBC29\uBB38",
  touch: "\uD2B9\uC815 \uC2E0\uCCB4 \uC811\uCD09",
  delivery: "\uD0DD\uBC30 / \uC624\uD1A0\uBC14\uC774 \uC18C\uB9AC",
  screen: "TV / \uD654\uBA74 \uC18D \uB3D9\uBB3C",
};

export function translate(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  const translateToken = (token: string) => {
    const t = token.trim();
    return LABEL_MAP[t] || LABEL_MAP[t.toLowerCase()] || t;
  };

  if (trimmed.includes(",") || trimmed.includes(";")) {
    return trimmed
      .split(/[;,]/)
      .map(translateToken)
      .filter(Boolean)
      .join(", ");
  }

  return translateToken(trimmed);
}
