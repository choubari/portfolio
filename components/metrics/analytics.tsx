"use client";

import React from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

export default function Analytics() {
  return <VercelAnalytics />;
}
