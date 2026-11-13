const RANK_NAMES: Record<string, string> = {
  CHALLENGER: '最强王者',
  GRANDMASTER: '傲世宗师',
  MASTER: '超凡大师',
  DIAMOND: '璀璨钻石',
  EMERALD: '流光翡翠',
  PLATINUM: '华贵铂金',
  GOLD: '荣耀黄金',
  SILVER: '不屈白银',
  BRONZE: '英勇青铜',
  IRON: '坚韧黑铁',
  UNRANKED: '未定级',
}

export function getRankName(tier: string): string {
  return RANK_NAMES[tier] ?? '未定级'
}
