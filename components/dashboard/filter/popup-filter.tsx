import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function FilterPopup({ isOpen, onClose, onFilter }: { isOpen: boolean; onClose: () => void; onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    project: "",
    keywords: [],
    range: [4000000, 7000000],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, range: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-lg">
        <DialogTitle>ตัวกรองข้อมูล</DialogTitle>
        <Input name="search" placeholder="ค้นหา" value={filters.search} onChange={handleChange} />
        <select name="department" value={filters.department} onChange={handleChange} className="input">
          <option value="">เลือกแผนก</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Marketing">Marketing</option>
          <option value="SEO">SEO</option>
        </select>
        <div className="flex gap-2">
          <Checkbox id="active" name="status" value="active" onChange={handleChange} />
          <label htmlFor="active">Active</label>
          <Checkbox id="inactive" name="status" value="inactive" onChange={handleChange} />
          <label htmlFor="inactive">Inactive</label>
        </div>
        <Slider min={4000000} max={7000000} value={filters.range} onChange={handleSliderChange} className="my-4" />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={() => onFilter(filters)}>ยืนยัน</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
