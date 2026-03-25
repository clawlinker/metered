import { getServices } from '@/lib/actions';
import { HomeClient } from '@/components/HomeClient';

export default async function HomePage() {
  const services = await getServices();
  return <HomeClient initialServices={services} />;
}
