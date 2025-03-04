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
      "Do you believe sustained diplomatic dialogue among world leaders can help reduce global tensions?",
    url: "https://vote.one/179i7c78",
  },
  {
    description:
      "Should there be mandatory international agreements to limit space debris from satellites and rockets?",
    url: "https://vote.one/Eh0iIrW5",
  },
  {
    description:
      "Should binding international regulations be established to govern the ethical development of artificial intelligence?",
    url: "https://vote.one/4PjcWqwV",
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
            Vote Now
          </Button>
        </a>
      </div>
    </div>
  );
}
