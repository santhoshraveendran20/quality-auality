import { Link } from 'react-router';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePageTitle from '@/hooks/usePageTitle';
import { useT } from '@/i18n';

export default function NotFound() {
  const ta = useT();
  usePageTitle(ta.notFoundTitle);
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-muted">
          <SearchX aria-hidden="true" className="size-7 text-muted-foreground" />
        </span>
        <p className="mt-6 text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{ta.notFoundTitle}</h1>
        <Button asChild className="mt-6">
          <Link to="/">
            <ArrowLeft />
            {ta.backHome}
          </Link>
        </Button>
      </div>
    </section>
  );
}
