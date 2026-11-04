import PageHeader from '@/components/PageHeader';
import ProductBrowser from '@/components/ProductBrowser';
import usePageTitle from '@/hooks/usePageTitle';
import ta from '@/i18n/ta.json';

export default function Products() {
  usePageTitle(ta.nav.products);
  return (
    <>
      <PageHeader
        title="எங்கள் பொருட்கள்"
        description="உங்களுக்குத் தேவையான அனைத்தும் ஒரே இடத்தில் — தேடுங்கள், வாட்ஸ்அப்பில் கேளுங்கள்."
        crumbs={[{ label: ta.nav.products }]}
      />
      <div className="container-x pb-16">
        <ProductBrowser />
      </div>
    </>
  );
}
