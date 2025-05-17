"use client";

import { Typography } from "@/components/ui/Typography";
import { useState, useEffect } from "react";
import { DrawerItem } from "@/components/DrawerItem";
import { SectionHeader } from "@/components/SectionHeader";
import { TabSwiper } from "@/components/TabSwiper";
import { OpenLetterCard } from "@/components/OpenLetterCard";
import { PollOfTheWeek } from "@/components/PollOfTheWeek";
import { useTranslations } from "@/hooks/useTranslations";
import { PoliticalPartyList } from "@/components/PoliticalPartyList";
import { Button } from "@/components/ui/Button";
import { PiUsersThreeFill, PiScalesFill } from "react-icons/pi";
import { useSearchParams } from "next/navigation";

const TAB_KEYS = {
  POLLS: "polls",
  OPEN_LETTERS: "openLetters",
  ELECTIONS: "elections",
  REFERENDUMS: "referendums",
  POLITICAL_PARTIES: "politicalParties",
} as const;

type TabKey = (typeof TAB_KEYS)[keyof typeof TAB_KEYS];

export default function GovernPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = useTranslations(lang);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(
    TAB_KEYS.POLITICAL_PARTIES
  );

  // Handle initial URL tab parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam && Object.values(TAB_KEYS).includes(tabParam as TabKey)) {
        setActiveTab(tabParam as TabKey);
      }
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam && Object.values(TAB_KEYS).includes(tabParam as TabKey)) {
        setActiveTab(tabParam as TabKey);
      } else {
        // Default to political parties if no valid tab is in the URL
        setActiveTab(TAB_KEYS.POLITICAL_PARTIES);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (!dictionary) {
    return null;
  }

  const tabs = [
    {
      key: TAB_KEYS.POLITICAL_PARTIES,
      label: dictionary?.components?.tabSwiper?.tabs?.politicalParties,
    },
    {
      key: TAB_KEYS.POLLS,
      label: dictionary?.components?.tabSwiper?.tabs?.polls,
    },
    {
      key: TAB_KEYS.OPEN_LETTERS,
      label: dictionary?.components?.tabSwiper?.tabs?.openLetters,
    },
    {
      key: TAB_KEYS.ELECTIONS,
      label: dictionary?.components?.tabSwiper?.tabs?.elections,
    },
    {
      key: TAB_KEYS.REFERENDUMS,
      label: dictionary?.components?.tabSwiper?.tabs?.referendums,
    },
  ];

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);

    // Update URL query parameter without full page refresh
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    // Update the URL to include both the language and tab parameter
    const newUrl = `/${lang}/govern?${params.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TAB_KEYS.POLITICAL_PARTIES:
        return (
          <>
            <SectionHeader
              title={
                dictionary?.pages?.govern?.sections?.politicalParties?.title
              }
              description={
                dictionary?.pages?.govern?.sections?.politicalParties
                  ?.description
              }
            />
            <MyPartySection lang={lang} />
            <PoliticalPartyList lang={lang} />
          </>
        );
      case TAB_KEYS.POLLS:
        return (
          <>
            <SectionHeader
              title={dictionary?.pages?.govern?.sections?.polls?.title}
              description={
                dictionary?.pages?.govern?.sections?.polls?.description
              }
            />
            <PollOfTheWeek lang={lang} />
          </>
        );
      case TAB_KEYS.OPEN_LETTERS:
        return (
          <>
            <SectionHeader
              title={dictionary?.pages?.govern?.sections?.openLetters?.title}
              description={
                dictionary?.pages?.govern?.sections?.openLetters?.description
              }
            />
            <OpenLetterCard
              title={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.aiRisk?.title
              }
              referenceTitle={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.aiRisk?.referenceTitle
              }
              referenceUrl="https://www.safe.ai/work/statement-on-ai-risk"
              voteUrl="https://world.org/mini-app?app_id=app_86794ef02e4fdd6579a937e4a0d858fb&app_mode=mini-app&path=/kJc54AbK"
            />
            <OpenLetterCard
              title={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.nuclear?.title
              }
              referenceTitle={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.nuclear?.referenceTitle
              }
              referenceUrl="https://futureoflife.org/open-letter/nuclear-open-letter/"
              voteUrl="https://world.org/mini-app?app_id=app_86794ef02e4fdd6579a937e4a0d858fb&app_mode=mini-app&path=/w1MDn0Dt"
            />
            <OpenLetterCard
              title={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.autonomousWeapons?.title
              }
              referenceTitle={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.autonomousWeapons?.referenceTitle
              }
              referenceUrl="https://futureoflife.org/open-letter/lethal-autonomous-weapons-pledge/"
              voteUrl="https://world.org/mini-app?app_id=app_86794ef02e4fdd6579a937e4a0d858fb&app_mode=mini-app&path=/eASgdeUE"
            />
            <OpenLetterCard
              title={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.longView?.title
              }
              referenceTitle={
                dictionary?.pages?.govern?.sections?.openLetters?.statements
                  ?.longView?.referenceTitle
              }
              referenceUrl="https://futureoflife.org/open-letter/long-view-leadership-on-existential-threats/"
              voteUrl="https://world.org/mini-app?app_id=app_86794ef02e4fdd6579a937e4a0d858fb&app_mode=mini-app&path=/NtprLPWh"
            />
            <DrawerItem
              title={dictionary?.pages?.govern?.sections?.openLetters?.addNew}
              isAddNew
              lang={lang}
            />
          </>
        );
      case TAB_KEYS.ELECTIONS:
        return (
          <>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <PiUsersThreeFill className="h-10 w-10 text-gray-400" />
              </div>
              <Typography
                as="h2"
                variant={{ variant: "heading", level: 1 }}
                className="mb-4 text-center"
              >
                {
                  dictionary?.pages?.govern?.sections?.elections
                    ?.worldConstituent?.title
                }
              </Typography>
              <Typography
                variant={{ variant: "subtitle", level: 1 }}
                className="mb-10 text-center text-gray-500"
              >
                {
                  dictionary?.pages?.govern?.sections?.elections
                    ?.worldConstituent?.description
                }
              </Typography>
              <Button variant="primary" fullWidth disabled>
                {
                  dictionary?.pages?.govern?.sections?.elections
                    ?.worldConstituent?.button
                }
              </Button>
            </div>
          </>
        );
      case TAB_KEYS.REFERENDUMS:
        return (
          <>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <PiScalesFill className="h-10 w-10 text-gray-400" />
              </div>
              <Typography
                as="h2"
                variant={{ variant: "heading", level: 1 }}
                className="mb-4 text-center"
              >
                {
                  dictionary?.pages?.govern?.sections?.referendums
                    ?.worldConstitutional?.title
                }
              </Typography>
              <Typography
                variant={{ variant: "subtitle", level: 1 }}
                className="mb-10 text-center text-gray-500"
              >
                {
                  dictionary?.pages?.govern?.sections?.referendums
                    ?.worldConstitutional?.description
                }
              </Typography>
              <Button variant="primary" fullWidth disabled>
                {
                  dictionary?.pages?.govern?.sections?.referendums
                    ?.worldConstitutional?.button
                }
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-safe flex min-h-dvh flex-col px-6">
      <div className="fixed left-0 right-0 top-0 z-10 bg-gray-0 px-6 pt-6">
        <Typography
          as="h2"
          variant={{ variant: "heading", level: 2 }}
          className="h-9 items-center"
        >
          {dictionary?.pages?.govern?.title}
        </Typography>

        <TabSwiper<TabKey>
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      <div
        className={`mt-[112px] flex flex-1 flex-col items-center ${activeTab !== TAB_KEYS.POLITICAL_PARTIES ? "justify-center" : ""} pb-8`}
      >
        {renderContent()}
      </div>
    </div>
  );
}
