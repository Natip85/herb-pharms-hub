import {
  ChevronDown,
  LocateFixedIcon,
  MapPinCheck,
  PlusSquare,
  Store,
} from "lucide-react";

export type NavItem = {
  title: string;
  path: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  submenu?: boolean;
  submenuItems?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  //   {
  //     title: "Featured",
  //     path: "/featured",
  //     submenu: true,
  //     icon: (props) => <ChevronDown {...props} />,

  //     submenuItems: [
  //       { title: "All", path: "/featured" },
  //       { title: "Water colors", path: "/watercolors" },
  //       { title: "Water colors", path: "/watercolors" },
  //     ],
  //   },
  {
    title: "My business",
    path: "/my-business",
    icon: (props) => <Store {...props} />,
  },
  {
    title: "Add a business",
    path: "/add-business",
    icon: (props) => <PlusSquare {...props} />,
  },

  {
    title: "Stock locator",
    path: "/stock-locator",
    icon: (props) => <MapPinCheck {...props} />,
  },
];
