"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function QuoteForm() {
  const t = useTranslations("quote");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t("errName")),
    company: z.string().optional(),
    email: z.string().email(t("errEmail")),
    phone: z.string().optional(),
    useCase: z.string().min(1, t("errUseCase")),
    location: z.string().optional(),
    quantity: z.string().optional(),
    message: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New quote request — ${values.useCase}`,
            from_name: "Seraf Technology website",
            ...values,
          }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Demo fallback: no key configured yet — simulate a successful send.
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-card p-10 text-center shadow-soft">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="font-display text-xl font-semibold text-foreground">{t("successTitle")}</h3>
        <p className="max-w-sm text-muted-foreground">{t("successBody")}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {t("submit")}
        </Button>
      </div>
    );
  }

  const optional = <span className="ml-1 text-xs font-normal text-muted-foreground">({t("optional")})</span>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t("name")} error={errors.name?.message}>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field id="company" label={<>{t("company")} {optional}</>}>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </Field>
        <Field id="email" label={t("email")} error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field id="phone" label={<>{t("phone")} {optional}</>}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="useCase" label={t("useCase")} error={errors.useCase?.message}>
          <Select id="useCase" defaultValue="" aria-invalid={!!errors.useCase} {...register("useCase")}>
            <option value="" disabled>{t("useCaseSelect")}</option>
            <option value="construction">{t("useCaseConstruction")}</option>
            <option value="renewables">{t("useCaseRenewables")}</option>
            <option value="events">{t("useCaseEvents")}</option>
            <option value="parking">{t("useCaseParking")}</option>
            <option value="property">{t("useCaseProperty")}</option>
            <option value="other">{t("useCaseOther")}</option>
          </Select>
        </Field>
        <Field id="location" label={<>{t("location")} {optional}</>}>
          <Input id="location" {...register("location")} />
        </Field>
        <Field id="quantity" label={<>{t("quantity")} {optional}</>} className="sm:col-span-2">
          <Input id="quantity" {...register("quantity")} />
        </Field>
        <Field id="message" label={<>{t("message")} {optional}</>} className="sm:col-span-2">
          <Textarea id="message" placeholder={t("messagePlaceholder")} {...register("message")} />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-5 flex items-center gap-2 text-sm text-danger" role="alert">
          <AlertCircle className="size-4" /> {t("errorBody")}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
      </Label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
