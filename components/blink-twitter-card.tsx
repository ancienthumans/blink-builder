import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ActionGetResponse } from "@/lib/zod/action-get-response-schema";
import Link from "next/link";

export function BlinkTwitterCard({ data }: { data: ActionGetResponse }) {
  return (
    <Card className="w-full shadow-2xl shadow-[#1d9bf0] border-[#1d9bf0] overflow-hidden bg-[#202327] font-sans">
      <CardContent className="p-0">
        <img
          src={data.icon}
          alt="action-image"
          className="w-full aspect-square object-cover overflow-hidden bg-muted"
        />

        <div className="flex flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="#"
              className="inline-flex items-center text-[#6e767d] truncate text-xs transition-all hover:text-[#949CA4] hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                preserveAspectRatio="xMidYMid meet"
                className="mr-2"
              >
                <g fill="currentColor" clipPath="url(#a)">
                  <path d="M7.409 9.774 9.774 7.41a.836.836 0 1 0-1.183-1.183L6.226 8.592A.836.836 0 1 0 7.41 9.774Z"></path>
                  <path d="M10.76.503A4.709 4.709 0 0 0 7.41 1.889L5.83 3.467A.836.836 0 1 0 7.014 4.65L8.59 3.072a3.067 3.067 0 0 1 4.338 4.337L11.35 8.987a.835.835 0 1 0 1.182 1.182l1.578-1.577a4.738 4.738 0 0 0-3.35-8.09ZM5.24 15.497a4.706 4.706 0 0 0 3.351-1.386l1.578-1.577a.836.836 0 1 0-1.182-1.183l-1.578 1.578a3.067 3.067 0 1 1-4.337-4.337L4.65 7.014A.836.836 0 1 0 3.467 5.83L1.889 7.41a4.737 4.737 0 0 0 3.351 8.088Z"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h16v16H0z"></path>
                  </clipPath>
                </defs>
              </svg>
              example.com
            </Link>
            <a
              href="https://docs.dialect.to/documentation/actions/security"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <div className="bg-[#B3B3B31A] text-[#888989] hover:text-[#949CA4] transition-colors motion-reduce:transition-none inline-flex items-center justify-center gap-1 rounded-full text-subtext font-semibold leading-none aspect-square p-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="none"
                    viewBox="0 0 16 16"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M13.863 3.42 8.38 1.088a.932.932 0 0 0-.787 0L2.108 3.421c-.641.291-1.137.904-1.108 1.662 0 2.916 1.196 8.195 6.212 10.616.496.233 1.05.233 1.546 0 5.016-2.42 6.212-7.7 6.241-10.616 0-.758-.496-1.37-1.137-1.662Zm-6.33 7.35h-.582a.69.69 0 0 0-.7.7c0 .408.292.7.7.7h2.216c.379 0 .7-.292.7-.7 0-.38-.321-.7-.7-.7h-.234V8.204c0-.38-.32-.7-.7-.7H7.208a.69.69 0 0 0-.7.7c0 .408.292.7.7.7h.326v1.866Zm-.466-5.133c0 .525.408.933.933.933a.94.94 0 0 0 .933-.933A.96.96 0 0 0 8 4.704a.94.94 0 0 0-.933.933Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <p className="mb-0.5 font-semibold leading-none text-white">{data.title}</p>

          <p className="mb-4 whitespace-pre-wrap text-sm text-[#c4c4c4]">{data.description}</p>

          {!data.links || data.links.actions.length == 0 ? (
            <Button variant={"twitter"} className="w-full">
              {data.title}
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              {data.links.actions.some((a) => !a.parameters) && (
                <div className="flex flex-wrap items-center gap-2">
                  {data.links.actions
                    .filter((a) => !a.parameters)
                    .map((action, index) => (
                      <div key={index + "action-button"} className="flex-auto">
                        <Button variant={"twitter"} className="w-full">
                          {action.label}
                        </Button>
                      </div>
                    ))}
                </div>
              )}

              {data.links.actions
                .filter((a) => !!a.parameters)
                .map((action, index) => (
                  <div
                    key={index + "input-action-button"}
                    className="flex items-center gap-2 rounded-full border border-[#3d4144] transition-all focus-within:border-[#1d9bf0]"
                  >
                    <input
                      placeholder={action.parameters?.[0].label}
                      className="ml-4 flex-1 bg-transparent truncate outline-none placeholder:text-neutral-500 text-white"
                    />
                    <div className="my-1.5 mr-1.5">
                      <Button variant={"twitter"}>{action.label}</Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {/* 
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-auto">
                <Button variant={"twitter"} className="w-full">
                  Buy for ~0.282 SOL
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
