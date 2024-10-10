import { Group, MantineSpacing, Text } from "@mantine/core";
import React from "react";
import { ESocialShare } from "types/social";
import { FacebookIcon } from "../../common/Buttons/SocialButtons/FacebookIcon";
import { LinkedinIcon } from "../../common/Buttons/SocialButtons/LinkedinIcon";
import { LinkIcon } from "../../common/Buttons/SocialButtons/LinkIcon";
import SocialButton from "../../common/Buttons/SocialButtons/SocialButton";
import { TwitterIcon } from "../../common/Buttons/SocialButtons/TwitterIcon";

import * as classes from "./socialShare.module.css";

const SocialShare: React.FC<{ text?: string; gap?: MantineSpacing }> = ({
  text = "Share this article on:",
  gap = "sm",
}) => (
  <Group justify="left" gap={gap}>
    <Text className={classes.text}>{text}</Text>
    <Group gap={gap}>
      <SocialButton
        radius={"sm"}
        type={ESocialShare.Facebook}
        icon={FacebookIcon as React.FC}
      />
      <SocialButton
        radius={"sm"}
        type={ESocialShare.Linkedin}
        icon={LinkedinIcon as React.FC}
      />
      <SocialButton
        radius={"sm"}
        type={ESocialShare.Twitter}
        icon={TwitterIcon as React.FC}
      />
      <SocialButton
        radius={"sm"}
        type={ESocialShare.CopyLink}
        icon={LinkIcon as React.FC}
      />
    </Group>
  </Group>
);

export default SocialShare;
