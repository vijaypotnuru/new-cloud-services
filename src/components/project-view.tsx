
import { useNavigate } from "react-router-dom";
import { Button } from "./custom/button";


export default function ProjectView({ project_id }: { project_id: string }) {
    const navigate = useNavigate()

  return <Button className='text-[#53278d] bg-[#e4dee2]' onClick={() => {
    navigate(`/main/projects/${project_id}`)
  }}>View</Button>
}
