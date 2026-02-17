## Optimizations

### Image components

- 자동으로 최적화
- layout shift 방지
- 로딩 속도 향상

```jsx
import Image from "next/image";

import logo from "@/assets/logo.png";

export default function Navbar() {
  return {
    {/** 생략 */}
    <Image src={logo.src} alt="logo" />
    {/** 이렇게 사용할 경우 에러 발생. */}
    <Image src={logo} alt="logo" />
    {/** import한 logo객체를 할당해야 함. */}
  };
}
```

- Image 컴포넌트를 쓸 때는 이미지 객체 자체를 할당해야 한다.
- Image 컴포넌트에서 `width`와 `height`를 미리 요구해서 렌더링 시, 미리 이미지가 들어갈 공간을 마련해 둔다. 이를 통해 `layout shift`를 방지한다.
- 고정된 이미지 크기를 설정할 때는 `width`와 `height`를 사용하는 것이 좋으나, 반응형으로 이미지 크기를 변경할 경우 `sizes` 프로퍼티를 사용하는 것이 권장된다.

  - `sizes="10vw"`

- 항상 load되어야 하는 이미지에는 `priority` 프로퍼티를 추가해야 한다.
  - default 값이 `lazy`이기에 화면에 보일때만 load된다.

---

### `fill`

- 동적으로 생성된 이미지의 경우 build 시기에 이미지 크기를 알 수 없다.
- 이 상황에서 크기를 설정하기 위해 `fill`을 사용한다.
- `fill` 사용 시 부모 컨테이너의 크기에 의해 결정되므로 부모 요소에 넓이 지정 필요
- 외부에서 이미지를 불러올 경우 `next.config.js`에서 설정 추가 필요

```jsx
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "url" }],
  },
};
```

---

### 정적 Metadata

- 정적 페이지에 적용할 시

```jsx
export const metadata = {
  title: "Page-title",
  description: "Page-description",
};
```

- [추가할 수 있는 속성들]("https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields")

```jsx
export const metadata = {
  generator: "Next.js",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
  creator: "Jiachi Liu",
  publisher: "Sebastian Markbåge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
```

---

### 동적 페이지 메타데이터

- dynamic routing을 통한 상세페이지 접근 시 생성되는 페이지의 metadata 설정할 때

```jsx
export async function generateMetadata({ params }) {
  // 전달되는 인수로 params에 접근 가능.
  // 객체를 return할 것.
  return {
    title: `detail${params.id}`,
    description: `detail${params.id} 입니다.`,
  };
}
```

```jsx
export async function generateMetadata() {
  // 혹은 데이터 불러오는 함수 실행해서, 정보 생성 가능
  // 예시
  const post = await getPost();
  const postNumber = post.length;
  return {
    title: `${postNumber}개의 post`,
    description: `${postNumber}개의 post가 있습니다.`,
  };
}
```

---

### next/dynamic을 활용한 무거운 컴포넌트 지연 로드

- 초기 렌더링에 필요하지 않은 무거운 컴포넌트(에디터, 차트, 지도 등)는 `next/dynamic`으로 분리한다.
- 초기 번들 크기를 줄여 TTI(Time to Interactive)와 LCP를 개선한다.

```jsx
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/Chart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
```

---

### CSS content-visibility로 긴 리스트 최적화

- `content-visibility: auto`를 적용하면 화면 밖 요소의 렌더링을 지연시켜 초기 렌더링 속도를 크게 개선한다.

```css
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

1000개의 항목이 있을 때, 브라우저가 화면 밖의 ~990개 항목의 layout/paint를 건너뛰어 약 10배 빠른 초기 렌더링이 가능하다.

---

### 비핵심 서드파티 라이브러리 지연 로드

- Analytics, 에러 트래킹 같은 라이브러리는 hydration 이후에 로드하여 초기 번들에서 제외한다.

```jsx
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```
