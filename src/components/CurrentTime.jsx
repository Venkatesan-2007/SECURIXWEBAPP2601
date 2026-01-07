import React, { useEffect, useState } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString();
      // Clean format: Tue, 06 Jan 2026 16:10:12
      const formatted = utcString.replace("GMT", "").trim();
      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className="current-time-display">{time}</span>;
}