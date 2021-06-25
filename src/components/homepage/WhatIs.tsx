import React, { FunctionComponent, ReactNode } from "react";
import { FullWidthSection } from "../layout/FullWidthSection";
import { Icon } from "../layout/Icon";
import styles from "./WhatIs.module.css";

const whatIsData = {
  title: <>Capact = Capabilities actualized</>,
  body: (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a mi a
        augue pulvinar ultrices quis quis lacus. Nunc at libero vitae ipsum
        fringilla congue quis sed ex. In ornare erat sapien, nec hendrerit nisi
        viverra vel. Praesent et porta tellus, at aliquet lorem. Sed et dui
        orci. Donec aliquet lorem nec turpis ultricies, id placerat odio semper.
      </p>
      <p>
        Nulla feugiat odio et tempor gravida. Aliquam vel erat ex. Suspendisse
        molestie ornare mi fermentum ullamcorper. Aliquam pellentesque justo et
        augue semper, et tempus ex laoreet. Nullam non magna erat. Fusce
        imperdiet ante eget nunc consequat, quis fermentum leo auctor.
      </p>
    </>
  ),
  highlights: [
    {
      iconName: "dashboard",
      body: (
        <>
          Donec ac ligula fringilla, convallis libero eu, sodales lorem. Etiam
          et dolor mollis, molestie dolor sed, sodales lorem. Nullam fringilla
          fringilla nisi eget gravida.
        </>
      ),
    },
    {
      iconName: "account_circle",
      body: (
        <>
          Maecenas ullamcorper, ligula at fringilla mattis, ipsum lorem
          elementum velit, quis fermentum mauris massa et metus. Curabitur
          congue enim lorem, nec tempor sapien laoreet sit amet.
        </>
      ),
    },
    {
      iconName: "thumb_up",
      body: (
        <>
          Sed et efficitur risus. Curabitur porttitor massa in augue blandit,
          vel pretium velit venenatis. Phasellus quis augue varius, interdum
          ante quis, pharetra nunc.
        </>
      ),
    },
  ],
};

interface HighlightProps {
  iconName: string;
  body: ReactNode;
}

const Highlight: FunctionComponent<HighlightProps> = ({ iconName, body }) => (
  <li>
    <div className={styles.highlight}>
      <div className={styles.highlightIconWrapper}>
        <Icon className={styles.highlightIcon}>{iconName}</Icon>
      </div>
      <p className={styles.highlightDesc}>{body}</p>
    </div>
  </li>
);

export const WhatIs: FunctionComponent = () => {
  const { title, body, highlights } = whatIsData;
  return (
    <FullWidthSection title="What is Capact?">
      <div className="col col--6">
        <h3>{title}</h3>
        <>{body}</>
      </div>
      <div className="col col--6">
        <ul className={styles.highlights}>
          {highlights.map((item) => (
            <Highlight {...item} />
          ))}
        </ul>
      </div>
    </FullWidthSection>
  );
};
