import { useParams } from 'react-router';
import PageHeader from '@/components/PageHeader';
import ProductBrowser from '@/components/ProductBrowser';
import CategoryIcon from '@/components/CategoryIcon';
import usePageTitle from '@/hooks/usePageTitle';
import NotFound from '@/pages/NotFound';
import categories from '@/data/categories.json';
import ta from '@/i18n/ta.json';

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  usePageTitle(category?.name_ta ?? ta.notFoundTitle);
  if (!category) return <NotFound />;
  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <CategoryIcon slug={category.slug} className="size-11" iconClassName="size-6" />
            {category.name_ta}
          </span>
        }
        description={`${category.name_en} · ${category.desc_ta}`}
        crumbs={[{ label: ta.nav.products, to: '/products' }, { label: category.name_ta }]}
      />
      <div className="container-x pb-16">
        <ProductBrowser key={category.slug} category={category} />
      </div>
    </>
  );
}
