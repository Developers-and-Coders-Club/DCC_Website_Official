import styles from "./components/leaderboard.module.css";
import LeaderboardRow from "./components/leaderboardrow";
import data from "@/app/data/leaderboard.json";

export default function Page() {
  const sorted = [...data].sort((a, b) => b.prs - a.prs);

  return (
        <div className={styles.page}>
            <h1 className={styles.heading}>
                <span className={styles.cup}>🏆</span> Leaderboard
            </h1>
            <div className={styles.container}>
                <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>PRs</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((user, idx) => (
                    <LeaderboardRow
                        key={user.id}
                        rank={idx + 1}
                        user={user}
                    />
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        );
}
