import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from "@react-email/components";

export function EmailShell({
  preview,
  title,
  eyebrow,
  intro,
  ctaLabel,
  ctaHref,
  children,
  footer
}: {
  preview: string;
  title: string;
  eyebrow: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  children: React.ReactNode;
  footer?: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={brandWrap}>
            <Text style={brand}>AnonHire</Text>
            <Text style={eyebrowText}>{eyebrow}</Text>
          </Section>
          <Section style={card}>
            <Heading style={heading}>{title}</Heading>
            <Text style={introText}>{intro}</Text>
            <Section style={content}>{children}</Section>
            <Section style={buttonRow}>
              <Button href={ctaHref} style={button}>
                {ctaLabel}
              </Button>
            </Section>
            <Hr style={divider} />
            <Text style={smallText}>
              Privacy-first hiring means candidate identity stays hidden until consent is given.
            </Text>
            {footer ? <Text style={footerText}>{footer}</Text> : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Text style={detailText}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

const body = {
  backgroundColor: "#edf5fb",
  fontFamily: "Inter, Arial, sans-serif",
  margin: 0,
  padding: "32px 16px"
};

const container = {
  margin: "0 auto",
  maxWidth: "560px"
};

const brandWrap = {
  padding: "0 8px 16px"
};

const brand = {
  color: "#66b3df",
  fontSize: "22px",
  fontWeight: "700",
  margin: 0
};

const eyebrowText = {
  color: "#6b7280",
  fontSize: "12px",
  letterSpacing: "0.18em",
  margin: "8px 0 0",
  textTransform: "uppercase" as const
};

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #d8e6f0",
  borderRadius: "24px",
  boxShadow: "0 20px 50px rgba(102, 179, 223, 0.14)",
  padding: "32px"
};

const heading = {
  color: "#44515f",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.2",
  margin: "0 0 16px"
};

const introText = {
  color: "#5f6b78",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 20px"
};

const content = {
  backgroundColor: "#f8fbfe",
  borderRadius: "18px",
  padding: "20px"
};

const detailText = {
  color: "#44515f",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0 0 10px"
};

const buttonRow = {
  paddingTop: "24px",
  paddingBottom: "8px"
};

const button = {
  backgroundColor: "#66b3df",
  borderRadius: "14px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  padding: "14px 22px",
  textDecoration: "none"
};

const divider = {
  borderColor: "#d8e6f0",
  margin: "20px 0"
};

const smallText = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: 0
};

const footerText = {
  color: "#8a94a1",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "14px 0 0"
};
