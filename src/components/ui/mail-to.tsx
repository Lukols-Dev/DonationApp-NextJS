import { ReactNode } from "react";

interface Props {
  title?: string;
  subject?: string;
  body?: string;
  children?: ReactNode;
}

const MailTo = ({ title, subject, body, children }: Props) => {
  return (
    <a
      href={`mailto:kontakt@tipey.pl?subject=${subject || ""}&body=${
        body || ""
      }`}
    >
      {children}
      {title}
    </a>
  );
};

export default MailTo;
