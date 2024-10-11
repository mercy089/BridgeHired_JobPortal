import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const ApplyJobsDrawer = ({ job, user, appliedJob = false, fetchJob }) => {
  return (
    <Drawer open={appliedJob ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !appliedJob ? "blue" : "destructive"}
          disabled={!job?.isOpen && appliedJob}
        >
          {job?.isOpen ? (appliedJob ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-10">
          <DrawerTitle>
            Apply for {job?.title} at {job?.companies.name}
          </DrawerTitle>
          <DrawerDescription>
            Fill out the form below to apply.
          </DrawerDescription>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-7 pb-0">
          <Input
            type="number"
            placeholder="years of experience"
            className="flex-1"
          />
          <Input
            type="text"
            placeholder="Skills (Comma separated)"
            className="flex-1"
          />
          <RadioGroup defaultValue="Intermediate">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Graduate" id="graduate" />
              <Label htmlFor="graduate">Graduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Post Graduate" id="post-graduate" />
              <Label htmlFor="post-graduate">Post Graduate</Label>
            </div>
          </RadioGroup>
          <Input
          type='file'
          accept=".pdf, .doc, .docx"
          className="flex-1 "
          />
          <Button type="submit" variant='blue' size="lg">Apply</Button> 
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobsDrawer;
