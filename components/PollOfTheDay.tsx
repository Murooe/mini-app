import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "./ui/Typography";

interface Poll {
  description: string;
  url: string;
}

const polls: Poll[] = [
  {
    description:
      "Should international collaboration on rare earth minerals be prioritized to enhance global resource security?",
    url: "https://vote.one/5StpP7UU",
  },
  {
    description:
      "Should wealthy countries accept more migrants fleeing conflict or climate disasters?",
    url: "https://vote.one/SJSETLZp",
  },
  {
    description:
      "Should countries be required to share real-time data during disease outbreaks to prevent global health crises?",
    url: "https://vote.one/OZ2T4A53",
  },
  {
    description:
      "Do you think global measures should be implemented to counter the spread of disinformation online?",
    url: "https://vote.one/rw4L36NM",
  },
  {
    description:
      "Should global authorities establish uniform standards to regulate cryptocurrencies and curb financial crimes?",
    url: "https://vote.one/0bTVLGAB",
  },
];

export function PollOfTheDay() {
  // Calculate poll index based on the number of days since a fixed reference date.
  const getPollIndex = () => {
    const referenceDate = new Date("2023-01-01T00:00:00Z");
    const now = new Date();
    const dayDiff = Math.floor(
      (now.getTime() - referenceDate.getTime()) / (24 * 60 * 60 * 1000)
    );
    return dayDiff % polls.length;
  };

  const [pollIndex, setPollIndex] = useState(getPollIndex());

  useEffect(() => {
    // Calculate how many milliseconds remain until the next day (change at midnight local time)
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setPollIndex(getPollIndex());
    }, msUntilTomorrow);

    return () => clearTimeout(timer);
  }, [pollIndex]);

  const currentPoll = polls[pollIndex];

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full">
        <Typography
          as="h3"
          variant={{ variant: "heading", level: 2 }}
          className="mb-10 text-center"
        >
          {currentPoll.description}
        </Typography>
        <a href={currentPoll.url} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" fullWidth>
            Vote now
          </Button>
        </a>
      </div>
    </div>
  );
}
