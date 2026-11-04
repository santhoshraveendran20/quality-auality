import { Fragment } from 'react';
import { Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';

export default function PageHeader({ title, description, crumbs = [], children }) {
  const ta = useT();
  return (
    <section className="relative overflow-hidden border-b bg-muted/30">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <Reveal from="left" className="container-x relative py-10 sm:py-14">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">{ta.nav.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {c.to && i < crumbs.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link to={c.to}>{c.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-balance text-muted-foreground sm:text-lg">{description}</p>}
        {children}
      </Reveal>
    </section>
  );
}
