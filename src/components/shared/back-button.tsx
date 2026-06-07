import { ArrowLeftIcon } from "lucide-react";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} className="bg-card shadow-md rounded-md p-2 px-4 w-max">
      <ArrowLeftIcon className="w-4 h-4" />
      Back
    </Button>
  );
}
