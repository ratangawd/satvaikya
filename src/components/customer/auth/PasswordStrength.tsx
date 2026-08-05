interface Props {
    password: string;
}

function calculateStrength(password: string) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

export default function PasswordStrength({
    password,
}: Props) {
    const score = calculateStrength(password);

    const labels = [
        "Very Weak",
        "Weak",
        "Fair",
        "Good",
        "Strong",
        "Excellent",
    ];

    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                        key={bar}
                        className={`h-2 flex-1 rounded-full transition-all ${bar <= score
                                ? "bg-green-500"
                                : "bg-muted"
                            }`}
                    />
                ))}
            </div>

            <p className="text-xs text-muted-foreground">
                Password Strength: {labels[score]}
            </p>
        </div>
    );
}