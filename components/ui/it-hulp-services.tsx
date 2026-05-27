'use client';
import ClippedVideoTab from '@/components/ui/clipped-video-tab';

const IMAGE_LAPTOP = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80';
const IMAGE_PHONE = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80';
const IMAGE_WIFI = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
const IMAGE_CODE = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80';

const servicesNL = [
  {
    iconKey: 'Monitor',
    label: 'PC & Laptop',
    description: 'Onderhoud, diagnose, virusverwijdering en advies bij aankoop van computers en laptops.',
    image: IMAGE_LAPTOP,
    card: {
      heading: 'PC-onderhoud',
      badge: 'Aan huis',
      goal: 'Snelle diagnose en oplossing voor computer- en laptopproblemen thuis.',
      tasks: [
        { title: 'Probleem diagnosticeren', meta: 'Ter plaatse of op afstand', status: 'completed' as const },
        { title: 'Reiniging uitvoeren', meta: 'Fysiek & digitaal', status: 'completed' as const },
        { title: 'Software updaten', meta: 'Bezig...', status: 'progress' as const },
        { title: 'Rapport bezorgen', meta: 'Nog te doen', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Smartphone',
    label: 'Smartphone & Tablet',
    description: 'Instellen, problemen oplossen en advies voor iPhones, iPads en Android-toestellen.',
    image: IMAGE_PHONE,
    card: {
      heading: 'Toestelhulp',
      badge: 'Mobiel',
      goal: 'Smartphone of tablet correct instellen en vlot laten werken.',
      tasks: [
        { title: 'Toestel analyseren', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Instellingen aanpassen', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Apps configureren', meta: 'Bezig...', status: 'progress' as const },
        { title: 'Klant informeren', meta: 'Nog te doen', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Wifi',
    label: 'Wifi & Netwerk',
    description: 'Bereikproblemen oplossen, trage verbinding versnellen en router correct instellen.',
    image: IMAGE_WIFI,
    card: {
      heading: 'Netwerkoptimalisatie',
      badge: 'Verbinding',
      goal: 'Stabiel wifi-bereik in heel het huis of op kantoor.',
      tasks: [
        { title: 'Meting uitvoeren', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Router controleren', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Signaal optimaliseren', meta: 'Bezig...', status: 'progress' as const },
        { title: 'Bereik valideren', meta: 'Nog te doen', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Mail',
    label: 'Software & E-mail',
    description: 'Software installeren, e-mailaccounts instellen en dagelijkse IT-vragen beantwoorden.',
    image: IMAGE_CODE,
    card: {
      heading: 'Software & E-mail',
      badge: 'Installatie',
      goal: 'Software en e-mail correct instellen voor dagelijks gebruik.',
      tasks: [
        { title: 'Vereisten bepalen', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Software installeren', meta: 'Voltooid', status: 'completed' as const },
        { title: 'Configuratie uitvoeren', meta: 'Bezig...', status: 'progress' as const },
        { title: 'Klant begeleiden', meta: 'Nog te doen', status: 'pending' as const },
      ],
    },
  },
];

const servicesEN = [
  {
    iconKey: 'Monitor',
    label: 'PC & Laptop',
    description: 'Maintenance, diagnostics, virus removal and advice when buying computers and laptops.',
    image: IMAGE_LAPTOP,
    card: {
      heading: 'PC Maintenance',
      badge: 'Home visit',
      goal: 'Fast diagnosis and resolution of computer and laptop issues at home.',
      tasks: [
        { title: 'Diagnose problem', meta: 'On-site or remote', status: 'completed' as const },
        { title: 'Perform cleanup', meta: 'Physical & digital', status: 'completed' as const },
        { title: 'Update software', meta: 'In progress...', status: 'progress' as const },
        { title: 'Deliver report', meta: 'To do', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Smartphone',
    label: 'Smartphone & Tablet',
    description: 'Setup, troubleshooting and advice for iPhones, iPads and Android devices.',
    image: IMAGE_PHONE,
    card: {
      heading: 'Device support',
      badge: 'Mobile',
      goal: 'Set up smartphone or tablet correctly and keep it running smoothly.',
      tasks: [
        { title: 'Analyse device', meta: 'Completed', status: 'completed' as const },
        { title: 'Adjust settings', meta: 'Completed', status: 'completed' as const },
        { title: 'Configure apps', meta: 'In progress...', status: 'progress' as const },
        { title: 'Inform customer', meta: 'To do', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Wifi',
    label: 'Wifi & Network',
    description: 'Solve coverage issues, speed up slow connections and configure your router correctly.',
    image: IMAGE_WIFI,
    card: {
      heading: 'Network optimisation',
      badge: 'Connectivity',
      goal: 'Stable wifi coverage throughout the house or office.',
      tasks: [
        { title: 'Perform measurement', meta: 'Completed', status: 'completed' as const },
        { title: 'Check router', meta: 'Completed', status: 'completed' as const },
        { title: 'Optimise signal', meta: 'In progress...', status: 'progress' as const },
        { title: 'Validate coverage', meta: 'To do', status: 'pending' as const },
      ],
    },
  },
  {
    iconKey: 'Mail',
    label: 'Software & Email',
    description: 'Install software, set up email accounts and answer everyday IT questions.',
    image: IMAGE_CODE,
    card: {
      heading: 'Software & Email',
      badge: 'Installation',
      goal: 'Set up software and email correctly for daily use.',
      tasks: [
        { title: 'Define requirements', meta: 'Completed', status: 'completed' as const },
        { title: 'Install software', meta: 'Completed', status: 'completed' as const },
        { title: 'Run configuration', meta: 'In progress...', status: 'progress' as const },
        { title: 'Guide customer', meta: 'To do', status: 'pending' as const },
      ],
    },
  },
];

export function ItHulpServices({ locale = 'nl' }: { locale?: 'nl' | 'en' }) {
  const isEN = locale === 'en';
  return (
    <ClippedVideoTab
      items={isEN ? servicesEN : servicesNL}
      heading={isEN ? 'Our services' : 'Onze diensten'}
      description={isEN
        ? 'Practical IT support for individuals in Roeselare — fast, personal and without technical jargon. Everything handled by'
        : 'Praktische IT-hulp voor particulieren in Roeselare — snel, persoonlijk en zonder technisch jargon. Alles geregeld door'}
      author="Vancoillie IT Hulp."
    />
  );
}
