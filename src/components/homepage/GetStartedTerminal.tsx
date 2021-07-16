import React, { FunctionComponent } from "react";
import 'react-animated-term/dist/react-animated-term.css';
import "./GetStartedTerminal.overrides.css";
import Terminal from 'react-animated-term';

const cmdStep = (title: string) => ({
  text: title,
  cmd: true,
  delay: 10
})

const termLines = [
  cmdStep("# Create local kind cluster"),
  cmdStep("capact env create kind"),
  cmdStep("# Install Capact"),
  cmdStep("capact install"),
  cmdStep("# Log in to the Capact Gateway"),
  cmdStep("capact login https://gateway.capact.local -u user -p pass"),
  cmdStep("# You're all set! Enjoy using Capact!"),
]

export const GetStartedTerminal: FunctionComponent = () => {
  return (
    <Terminal
      lines={termLines}
      interval={50}
    />
  )
}
