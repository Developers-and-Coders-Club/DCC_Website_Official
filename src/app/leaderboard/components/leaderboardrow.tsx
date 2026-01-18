import styles from "./leaderboard.module.css";

type User = {
    id: number;
    name: string;
    prs: number;
    avatar?: string;
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

    const rankDisplay = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : String(rank);

    const hasAvatar = Boolean(user.avatar && user.avatar.trim());

    return (
        <tr className={`${rwClass}`}>
            <td className={styles.cellRank}>
                <span className={`${styles.rankBadge} ${top3 ? rnkClass : ""}`} aria-label={`rank ${rank}`}>
                    {rankDisplay}
                </span>
            </td>
            <td className={styles.cellName}>
                <div className={styles.nameRow}>
                    <span className={styles.avatar} title={user.name}>
                        {hasAvatar ? (
                            <img src={user.avatar} alt={user.name} className={styles.avatarImg} />
                        ) : (
                            getInitials(user.name)
                        )}
                    </span>
                    <span className={styles.name}>{user.name}</span>
                </div>
            </td>
            <td className={styles.cellPrs}>
                <span className={styles.prs}>{user.prs}</span>
            </td>
        </tr>
    );
}

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}
