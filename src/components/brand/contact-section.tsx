import { Mail, Phone, ExternalLink } from "lucide-react"
import type { ContactInfo } from "@/lib/schema"

interface ContactSectionProps {
  contact: ContactInfo
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <div className="max-w-xl">
      {contact.heading && (
        <h3 className="text-lg font-medium">{contact.heading}</h3>
      )}
      {contact.description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {contact.description}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            {contact.email}
          </a>
        )}
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
            {contact.phone}
          </a>
        )}
        {contact.links?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
