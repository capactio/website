import React, { FunctionComponent } from "react";
import 'react-animated-term/dist/react-animated-term.css';
import "./GetStartedTerminal.overrides.css";
import Terminal from 'react-animated-term';


const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const cmdStep = (title) => {
  return {
    text: title,
    cmd: true,
    delay: 10
  }
}
const spinningStep = (title, repeatCount = 0) => {
  return {
    text: `✔ ${title}`,
    cmd: false,
    repeat: repeatCount > 0,
    repeatCount: repeatCount,
    frames: spinner.map(function (spinnerItem) {
      return {
        text: `${spinnerItem} ${title}`,
        delay: 10
      }
    })
  }
}

const termLines = [
  cmdStep("capact env create kind"),
  spinningStep("Creating cluster `kind-dev-capact`..."),
  cmdStep("capact install"),
  spinningStep("Installing Capact on cluster...", 2),
  cmdStep("capact login https://gateway.capact.local -u user -p pass"),
  {
    text: '✔ Login succeeded',
    delay: 10
  },
  cmdStep("# You're all set! Enjoy using Capact!"),
]

export const GetStartedTerminal: FunctionComponent = () => {
  console.log(termLines);
  return (
    <Terminal
      lines={termLines}
      interval={80}
    />
  )
}
