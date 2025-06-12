import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck, ArrowUpRight } from "lucide-react";
import { ResponseService } from "@/services/responses.service";
import axios from "axios";
import MiniLoader from "@/components/loaders/mini-loader/miniLoader";
import { InterviewerService } from "@/services/interviewers.service";

interface Props {
  name: string | null;
  interviewerId: bigint;
  id: string;
  url: string;
  readableSlug: string;
}

const base_url = process.env.NEXT_PUBLIC_LIVE_URL;

function InterviewCard({ name, interviewerId, id, url, readableSlug }: Props) {
  const [copied, setCopied] = useState(false);
  const [responseCount, setResponseCount] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchInterviewer = async () => {
      const interviewer =
        await InterviewerService.getInterviewer(interviewerId);
      setImg(interviewer.image);
    };
    fetchInterviewer();
  }, [interviewerId]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responses = await ResponseService.getAllResponses(id);
        setResponseCount(responses.length);
        if (responses.length > 0) {
          setIsFetching(true);
          for (const response of responses) {
            if (!response.is_analysed) {
              try {
                const result = await axios.post("/api/get-call", {
                  id: response.call_id,
                });
                if (result.status !== 200) throw new Error("Failed");
              } catch (error) {
                console.error("Call error:", error);
              }
            }
          }
          setIsFetching(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchResponses();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(readableSlug ? `${base_url}/call/${readableSlug}` : url)
      .then(() => {
        setCopied(true);
        toast.success("Interview link copied to clipboard.", {
          position: "bottom-right",
          duration: 3000,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Copy failed", err));
  };

  const handleJumpToInterview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const interviewUrl = readableSlug
      ? `/call/${readableSlug}`
      : `/call/${url}`;
    window.open(interviewUrl, "_blank");
  };

  return (
    <a
      href={`/interviews/${id}`}
      className={`relative w-64 h-72 m-3 p-0 rounded-2xl shadow-xl transition-transform hover:scale-105 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${
        isFetching ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <Card className="h-full w-full">
        <CardContent className="p-0 h-full">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-28 rounded-t-2xl flex items-center justify-center text-white text-xl font-semibold relative">
            {name || "Untitled"}
            {isFetching && (
              <div className="absolute top-2 right-2">
                <MiniLoader />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src={img}
                alt="Interviewer"
                width={64}
                height={64}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col text-sm text-zinc-700 dark:text-zinc-200">
              <span className="font-semibold">Responses</span>
              <span className="text-md">{responseCount ?? 0}</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-blue-100 dark:hover:bg-blue-900 p-1"
              onClick={handleJumpToInterview}
            >
              <ArrowUpRight size={18} className="text-blue-600" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className={`hover:bg-blue-100 dark:hover:bg-blue-900 p-1 ${
                copied ? "bg-blue-600 text-white" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard();
              }}
            >
              {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default InterviewCard;
