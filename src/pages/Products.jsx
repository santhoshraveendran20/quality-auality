import PageHeader from '@/components/PageHeader';
import ProductBrowser from '@/components/ProductBrowser';
import usePageTitle from '@/hooks/usePageTitle';
import { useT } from '@/i18n';

export default function Products() {
  const ta = useT();
  usePageTitle(ta.nav.products);
  return (
    <>
      <PageHeader
        title={ta.productsPage.title}
        description={ta.productsPage.text}
        crumbs={[{ label: ta.nav.products }]}
      />
      <div className="container-x pb-16">
        <ProductBrowser />
      </div>
    </>
  );
}
