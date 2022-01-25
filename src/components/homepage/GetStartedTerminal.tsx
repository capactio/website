import clsx from "clsx";
import React, { FunctionComponent } from "react";
import styles from "./GetStartedTerminal.module.css";


const stableTerminalData = [
  {
    text: "# Create local kind cluster",
    dimmed: true,
  },
  {
    text: "capact env create kind",
  },
  {
    text: "# Install Capact",
    dimmed: true,
  },
  {
    text: "capact install",
  },
  {
    text: "# Log in interactively to the Capact Gateway",
    dimmed: true,
  },
  {
    text: "capact login https://gateway.capact.local"
  },
  {
    text: "# You're all set! Enjoy using Capact!",
    dimmed: true
  }
]

const latestTerminalData = [
	{
		text: "# Create local k3d cluster",
		dimmed: true,
	},
	{
		text: "capact env create k3d",
	},
	{
		text: "# Install Capact",
		dimmed: true,
	},
	{
		text: "capact install --version @latest --helm-repo @latest",
	},
	{
		text: "# Log in interactively to the Capact Gateway",
		dimmed: true,
	},
	{
		text: "capact login https://gateway.capact.local"
	},
	{
		text: "# You're all set! Enjoy using Capact!",
		dimmed: true
	}
]

interface GetStartedTerminalInput {
	latest?: boolean
}

export const GetStartedTerminal: FunctionComponent<GetStartedTerminalInput> = ({latest}: GetStartedTerminalInput) => {
	const steps = latest ? latestTerminalData : stableTerminalData
  return (
    <div className={styles.terminal} id="termynal" data-termynal>
      {steps.map(({ text, dimmed }, idx) => (
        <span key={idx} data-ty="input" className={clsx({ [styles.lineDimmed]: dimmed })}>{text}</span>
      ))}
    </div>
  )
}
