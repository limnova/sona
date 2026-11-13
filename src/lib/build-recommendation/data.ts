import { isSummonersRift } from '@/lib/game-mode';
import { logger } from "@/index";
import { getAllChampions } from "@/lib/assets";
import {
  opggApi,
  type OpggChampion,
  type OpggPosition,
  type OpggTier,
} from "@/lib/opgg-api";
import type {
  BuildRecommendation,
  RecommendationContext,
} from "@/types/build-recommendation";
import {
  resolveRecommendationPosition,
} from "./context";

export async function loadRecommendation(
  context: RecommendationContext,
  tier: OpggTier,
): Promise<BuildRecommendation | null> {
  if (context.championId <= 0) return null;

  if (!isSummonersRift(context)) return null;
  const position = resolveRecommendationPosition(context.position);

  const mainChampion = await getChampionWithVersionFallback({
    id: context.championId,
    tier,
    position,
  });

  const data = mainChampion.data;

  return {
    version: mainChampion.meta.version,
    position,
    summary: getSummaryLines(mainChampion),
    summonerSpells: data.summoner_spells ?? [],
    starterItems: data.starter_items ?? [],
    boots: data.boots ?? [],
    coreItems: data.core_items ?? [],
    lastItems: data.last_items ?? [],
    runePages: data.runes ?? [],
    matchups: mapOpggMatchups(data.counters),
    meta: getRecommendationMeta(mainChampion),
  };
}

function mapOpggMatchups(
  counters: NonNullable<OpggChampion["data"]["counters"]>,
): BuildRecommendation["matchups"] {
  return counters
    .map((counter) => ({
      championId: counter.champion_id,
      play: counter.play,
      win: counter.win,
      winRate: counter.play > 0 ? counter.win / counter.play : 0,
    }))
    .filter((counter) => counter.championId > 0 && counter.play > 0);
}

function getRecommendationMeta(
  champion: OpggChampion,
): BuildRecommendation["meta"] {
  const stats = champion.data.summary.average_stats;
  const tierData = "tier_data" in stats ? stats.tier_data : undefined;
  let rank = stats.rank > 0 ? stats.rank : null;
  if (tierData && tierData.rank > 0) rank = tierData.rank;
  const previousRank =
    tierData?.rank_prev && tierData.rank_prev > 0 ? tierData.rank_prev : null;
  const totalRank = getAllChampions().length || null;

  return {
    rank,
    previousRank,
    // 排名数字越小越强：从 #80 到 #60 记为上升 20。
    rankDelta:
      rank != null && previousRank != null ? previousRank - rank : null,
    totalRank,
    matchCount: champion.meta.match_count ?? null,
    version: champion.meta.version,
    updatedAt: champion.meta.analyzed_at ?? champion.meta.cached_at ?? "",
  };
}

async function getChampionWithVersionFallback(options: {
  id: number;
  tier: OpggTier;
  position?: OpggPosition;
  version?: string;
}): Promise<OpggChampion> {
  try {
    return await opggApi.getChampion(options);
  } catch (err) {
    if (!options.version) throw err;
    logger.warn(
      "[OPGG] 版本 %s 请求失败，回退到 OP.GG 最新版本:",
      options.version,
      err,
    );
    return opggApi.getChampion({ ...options, version: undefined });
  }
}

function getSummaryLines(champion: OpggChampion): string[] {
  const stats = champion.data.summary.average_stats;
  return [
    `总体胜率 ${(stats.win_rate * 100).toFixed(1)}%`,
    `登场 ${(stats.pick_rate * 100).toFixed(1)}%`,
    `Tier ${stats.tier || "-"}`,
  ];
}
