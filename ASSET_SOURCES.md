# Ableton image sources

The active Push 3 page uses a procedural CSS 3D concept model for the Touch, Express, and Build chapters. It uses `push-performance.webp` for the computer-free scene, and pairs `push-top.webp` with `live-session-view.webp` in the Push and Live chapter. `push-top.webp` also appears in the ending. Earlier Live story assets and `push-live.webp` remain in the repository but are not loaded by the active page.


All image assets below are genuine product screenshots served from Ableton-owned pages and image infrastructure. They are stored locally as WebP for this classroom project. The two Session View files are different resolution exports of the same official screenshot.

| Local file                                        | Official source page                                                                      | Official image URL                                                                                                                         | Use                                          |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `public/assets/ableton/live-session-closeup.webp` | [What is Live?](https://www.ableton.com/en/live/what-is-live/)                            | [Ableton image, 4000 px WebP](https://beta-ableton.imgix.net/media/b2qnxryw/screenshot-session-view.png?fm=webp&w=4000&q=85)               | Preloaded high-resolution Hero crop and zoom |
| `public/assets/ableton/live-session-view.webp`    | [What is Live?](https://www.ableton.com/en/live/what-is-live/)                            | [Ableton image, 2400 px WebP](https://beta-ableton.imgix.net/media/b2qnxryw/screenshot-session-view.png?fm=webp&w=2400&q=85)               | Active Push and Live chapter: Session View interface        |
| `public/assets/ableton/live-lite-session.webp`    | [What is Live 12 Lite?](https://www.ableton.com/en/products/live-lite/what-is-live-lite/) | [Ableton image, 2000 px WebP](https://ableton-production.imgix.net/components/text-beside-media/live-lite-session.jpg?fm=webp&w=2000&q=83) | Session detail image strips                  |
| `public/assets/ableton/arrangement/live-arrangement-view.webp` | [What is Live?](https://www.ableton.com/en/live/what-is-live/) | [Ableton image, 2000 px WebP](https://beta-ableton.imgix.net/media/tgll5joj/screenshot-arrangement-view.png?fm=webp&w=2000&q=84) | Arrangement View reveal and timeline |
| `public/assets/ableton/devices/live-device-chain.webp` | [What is Live?](https://www.ableton.com/en/live/what-is-live/) | [Ableton image, 1800 px WebP](https://beta-ableton.imgix.net/media/lsjfvevy/screenshot-racks.png?fm=webp&w=1800&q=84) | Device chain wide shot |
| `public/assets/ableton/devices/roar-device.webp` | [Live 12](https://www.ableton.com/en/live/) | [Ableton image, 1600 px WebP](https://beta-ableton.imgix.net/media/3zdk4pmt/roar-beat-2x.png?fm=webp&w=1600&q=86) | Roar macro detail |
| `public/assets/ableton/devices/meld-device.webp` | [Live 12](https://www.ableton.com/en/live/) | [Ableton image, 1600 px WebP](https://beta-ableton.imgix.net/media/45jmxa50/meld-carbon-strings-2x.png?fm=webp&w=1600&q=86) | Meld device detail |
| `public/assets/ableton/push/push-top.webp` | [Push](https://www.ableton.com/en/push/) | [Ableton image, 1800 px WebP](https://ableton-production.imgix.net/tours/push/push-3/One_Push_2_configurations_Square_Standalone_2046x2046.jpg?fm=webp&w=1800&q=86) | Push and Live chapter; ending |
| `public/assets/ableton/push/push-performance.webp` | [Push](https://www.ableton.com/en/push/) | [Ableton image, 1800 px WebP](https://beta-ableton.imgix.net/media/qhika0yg/p3-expressive-instrument_2500x3333.jpg?fm=webp&w=1800&q=84) | Standalone chapter: Push and headphones, no computer in frame |
| `public/assets/ableton/push/push-live.webp` | [Push](https://www.ableton.com/en/push/) | [Ableton image, 1800 px WebP](https://beta-ableton.imgix.net/media/rhajfof1/p3-config-controller.jpg?fm=webp&w=1800&q=85) | Retained local asset; not used on the active page |
| `public/assets/ableton/workspace/live-workspace.webp` | [What is Live?](https://www.ableton.com/en/live/what-is-live/) | [Ableton image, 1800 px WebP](https://beta-ableton.imgix.net/media/jmmb5tmv/what-is-live12.png?fm=webp&w=1800&q=84) | Stable full studio workspace view |

Screenshots remain intact. The website changes their crop, scale, contrast, and overlays only in the browser.

## Motion references

The current camera uses native scroll progress and CSS transforms over the locally constructed dimensional model. The Awwwards examples that informed its presentation are recorded in [REFERENCES.md](./REFERENCES.md). No animation or 3D library is required at runtime.
