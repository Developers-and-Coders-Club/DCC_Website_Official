import styles from "./leaderboard.module.css";

type User = {
    id: number;
    name: string;
    prs: number;
};

type props = {
    rank: number;
    user: User;
};

export default function LeaderboardRow({ rank, user }: props) {
    const top3 = rank <= 3;

    const rnkClass =
        rank === 1 ? styles.rank1 :
        rank === 2 ? styles.rank2 :
        rank === 3 ? styles.rank3 : "";

    const rwClass = top3
        ? styles.top3
        : rank % 2 === 0
        ? styles.evenRow
        : styles.tbodyRow;

    return (
            <tr>
                <td colSpan={3}>
                    <div className={`${styles.rowWrapper} ${rwClass}`}>
                        <span className={`${styles.rankBadge} ${top3 ? rnkClass : ""}`}>
                            {rank}
                        </span>
                        <span className={styles.name}>{user.name}</span>
                        <span className={styles.prs}>{user.prs}</span>
                    </div>
                </td>
            </tr>
            );
}
