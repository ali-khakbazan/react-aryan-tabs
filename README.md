
# React Aryan Tabs

A simple and animated react tabs



## API Reference


| Parameter | Type     | Required  | Description                |
| :-------- | :------- | :-----| :------------------------- |
| `id` | `string` | **YES** | A unique id for tabs wrapper |
| `rtl` | `boolean` | **NO** | set direction to rtl |
| `activeBorderCollor` | `string` | **NO** | active border color |
| `bodyClassName` | `string` | **NO** | tabs wrapper childrens classname |
| `wrapperStyles` | `(styles: CSSProperties) => CSSProperties` | **NO** | a function that takes default styles and returns {...styles, your new styles} |
| `tabStyles` | `(styles: CSSProperties) => CSSProperties` | **NO** | a function that takes default styles and returns {...styles, your new styles} |
| `tabBorderStyles` | `(styles: CSSProperties) => CSSProperties` | **NO** | a function that takes default styles and returns {...styles, your new styles} |


## Usage/Examples

```javascript
import { Tabs, TabPane } from "../components/animated-version";


export default function App() {
  return (
    <div className="App">
      <h1>Animated Version with React Spring</h1>
      <Tabs id="test">
        <TabPane keyProp="test-1" tab="First Tab">
          <p>first tab content</p>
        </TabPane>

        <TabPane keyProp="test-2" tab="Second Tab">
          <p>second tab content</p>
        </TabPane>

        <TabPane keyProp="test-3" tab="Third Tab">
          <p>third tab content</p>
        </TabPane>
      </Tabs>
    </div>
  );
}
```

