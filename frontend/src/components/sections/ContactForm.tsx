"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/strapi";
import { Loader2 } from "lucide-react";
import { TreadPatternModel } from "@/lib/data";

import { MultiSelect } from "@/components/ui/multi-select"; 

interface ContactFormProps {
  productName?: string;
  models?: TreadPatternModel[];
  onSuccess?: () => void;
}

export const ContactForm = ({ productName, models, onSuccess }: ContactFormProps) => {
  const initialFormState = {
    name: "",
    phoneNumber: "",
    email: "",
    // If a product name is passed, default to "Báo giá"
    requestType: productName ? "Báo giá" : "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  // Effect to update the description when selected models change
  useEffect(() => {
    if (productName) {
      let descriptionText = `Tôi muốn yêu cầu báo giá cho sản phẩm: ${productName}`;
      if (selectedModels.length > 0) {
        descriptionText += `\n\nCác mã sản phẩm quan tâm:\n- ${selectedModels.join("\n- ")}`;
      }
      setFormData((prev) => ({ ...prev, description: descriptionText }));
    }
  }, [selectedModels, productName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, requestType: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.requestType) {
      toast.error("Vui lòng chọn loại yêu cầu.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
        setFormData(initialFormState);
        setSelectedModels([]);
        onSuccess?.(); // Call the success callback if it exists (to close the modal)
      } else {
        toast.error("Gửi yêu cầu thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
      {/* Conditional Fields for Quote Request */}
      {models && models.length > 0 && (
        <div className="space-y-2">
          <Label>Chọn mã sản phẩm (tùy chọn)</Label>
                    <MultiSelect
            options={models.map(model => ({ label: model.sku, value: model.sku }))}
            onValueChange={setSelectedModels}
            value={selectedModels}
            placeholder="Chọn một hoặc nhiều mã..."
            animation={1}
          />
        </div>
      )}

      {/* Standard Fields */}
      <div className="space-y-2">
        <Label htmlFor="name">Họ và Tên *</Label>
        <Input
          id="name"
          placeholder="Nhập tên của bạn"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Số điện thoại *</Label>
        <Input
          id="phoneNumber"
          placeholder="Nhập số điện thoại"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Nhập email (không bắt buộc)"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      {/* Hide Request Type if it's a product quote */}
      {!productName && (
        <div className="space-y-2">
          <Label htmlFor="requestType">Loại yêu cầu *</Label>
          <Select onValueChange={handleSelectChange} required value={formData.requestType} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại yêu cầu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tư vấn">Tư vấn</SelectItem>
              <SelectItem value="Báo giá">Báo giá</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2 flex flex-col flex-grow">
        <Label htmlFor="description">Nội dung tin nhắn</Label>
        <Textarea
          id="description"
          placeholder="Bạn cần tư vấn về sản phẩm nào?"
          className="flex-grow min-h-[100px]"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading || (!!productName && selectedModels.length > 0)} // Disable if models are being selected
          readOnly={!!productName} // Make it read-only if it's a quote request to prevent accidental changes
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Đang gửi..." : "Gửi Tin Nhắn"}
      </Button>
    </form>
  );
};
