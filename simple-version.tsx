import {
  Children,
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type TabsProps = PropsWithChildren<{
  id: string;
  bodyClassName?: string;
  wrapperStyles?: (styles: CSSProperties) => CSSProperties;
  tabStyles?: (styles: CSSProperties) => CSSProperties;
  tabBorderStyles?: (styles: CSSProperties) => CSSProperties;
  rtl?: boolean;
  activeCollor?: string;
}>;

export const Tabs: React.FC<TabsProps> = ({
  id,
  bodyClassName,
  wrapperStyles,
  tabBorderStyles,
  activeCollor = "#3498db",
  tabStyles,
  rtl,
  children,
}) => {
  const [borderStyles, setBorderStyles] = useState<{
    width: string;
    left: string;
  } | null>(null);

  // get TabPanes from Tabs and make an array of them
  const tabsData = useMemo(
    () => Children.toArray(children).map((item: any) => item.props),
    [children]
  );

  // set first member of last step array as active tab
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  // set first tab width and left for first render (also we have a default width and left for them)
  useEffect(() => {
    const tabsWrapper = document.getElementById(id);
    const firstTab: any = tabsWrapper?.childNodes[0];

    if (firstTab) {
      setBorderStyles({
        width: `${firstTab?.clientWidth}px`,
        left: `${firstTab?.offsetLeft}px`,
      });
    }
  }, []);

  // set clicked tab as active tab and save clicked tab width and left position
  const handleActiveTab = useCallback((e: any, item: any) => {
    setActiveTab(item);

    if (e) {
      setBorderStyles({
        width: `${e.target.clientWidth}px`,
        left: `${e.target.offsetLeft}px`,
      });
    }
  }, []);

  // tabs parent div styles
  const wrapperStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      position: "relative",
      borderBottom: "1px solid #E7E7ED",
      display: "flex",
      alignItems: "center",
      columnGap: "1.25rem",
    };

    if (wrapperStyles) {
      return wrapperStyles(defaultStyles);
    }

    return defaultStyles;
  }, [wrapperStyles]);

  // single tab styles
  const tabStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      padding: "0.5rem 0",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      userSelect: "none",
    };

    if (tabStyles) {
      return tabStyles(defaultStyles);
    }

    return defaultStyles;
  }, [tabStyles]);

  // active border of tabs styles
  const tabBorderStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      transition: "all 250ms ease-in-out",
      right: borderStyles?.left ? "unset" : "8px",
      left: borderStyles?.left ?? "unset",
      width: borderStyles?.width ?? "40px",
      backgroundColor: activeCollor,
      height: "2px",
      bottom: "0px",
      position: "absolute",
    };

    if (tabBorderStyles) {
      return tabBorderStyles(defaultStyles);
    }

    return defaultStyles;
  }, [tabBorderStyles, borderStyles?.left, borderStyles?.width, activeCollor]);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <div role="tablist" style={wrapperStylesBox} id={id}>
        {tabsData?.map((item, idx) => (
          <div
            id={item.key}
            role="tab"
            aria-controls="tab-description"
            key={`tab-${id}-${idx}`}
            style={{
              ...tabStylesBox,
              color:
                activeTab.tab === item.tab ? "#333333" : "rgba(0, 0, 0, 0.5)",
              transition: "color 200ms ease-in-out",
            }}
            onClick={(e) => handleActiveTab(e, item)}
          >
            <p>{item?.tab}</p>
          </div>
        ))}

        <div style={tabBorderStylesBox}></div>
      </div>

      <div className="relative">
        <div className={`${bodyClassName} fade`}>{activeTab?.children}</div>
      </div>
    </div>
  );
};

type TabPaneProps = PropsWithChildren<{
  keyProp: string;
  tab: string;
}>;

export const TabPane: React.FC<TabPaneProps> = ({ tab, keyProp, children }) => {
  return <div>{children}</div>;
};
