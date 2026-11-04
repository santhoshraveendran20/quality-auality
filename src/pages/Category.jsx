import { useParams } from 'react-router';
import PageHeader from '@/components/PageHeader';
import ProductBrowser from '@/components/ProductBrowser';
import CategoryIcon from '@/components/CategoryIcon';
import usePageTitle from '@/hooks/usePageTitle';
import NotFound from '@/pages/NotFound';
import categories from '@/data/categories.json';
import { useLang } from '@/i18n';

export default function Category() {
  const { t: ta, pick, pickOther } = useLang();
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  usePageTitle(category ? pick(category, 'name') : ta.notFoundTitle);
  if (!category) return <NotFound />;
  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <CategoryIcon slug={category.slug} className="size-11" iconClassName="size-6" />
            {pick(category, 'name')}
          </span>
        }
        description={`${pickOther(category, 'name')} · ${pick(category, 'desc')}`}
        crumbs={[{ label: ta.nav.products, to: '/products' }, { label: pick(category, 'name') }]}
      />
      <div className="container-x pb-16">
        <ProductBrowser key={category.slug} category={category} />
      </div>
    </>
  );
}
