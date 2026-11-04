import { Link } from 'react-router';
import { MessageCircle, Navigation, Phone } from 'lucide-react';
import { directionsUrl, telHref, waHref } from '@/lib/store';
import { useT } from '@/i18n';

export const ACTION_ICONS = { call: Phone, whatsapp: MessageCircle, directions: Navigation };

const ACTIONS = {
  call: (t) => ({ label: t.actions.call, href: () => telHref() }),
  whatsapp: (t) => ({ label: t.actions.whatsapp, href: (message) => waHref(message ?? t.whatsappGreeting) }),
  directions: (t) => ({ label: t.actions.directions, href: () => directionsUrl() }),
};

/**
 * Call / WhatsApp / Directions link with its lucide icon. If the phone or WhatsApp number
 * is not set yet in store.json it links to the Contact page, so a button never breaks.
 * Extra props are forwarded, so it is styled with <Button asChild>.
 */
export default function ActionLink({ kind, message, iconClassName, children, ...props }) {
  const t = useT();
  const Icon = ACTION_ICONS[kind];
  const { label, href } = ACTIONS[kind](t);
  const url = href(message);
  const content = (
    <>
      <Icon aria-hidden="true" className={iconClassName} />
      <span>{children ?? label}</span>
    </>
  );

  if (!url) {
    return (
      <Link to="/contact" {...props}>
        {content}
      </Link>
    );
  }

  const external = kind !== 'call';
  return (
    <a href={url} data-track={kind} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {content}
    </a>
  );
}
