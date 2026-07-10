import { CLINIC_ADDRESS, CLINIC_AREA, clinicMapEmbedUrl } from "@/lib/site";

export default function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className={`location-map ${compact ? "location-map--compact" : ""}`.trim()}>
        <iframe
          title={`DG Clinic — ${CLINIC_AREA}`}
          src={clinicMapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={false}
        />
      </div>
      <p className="location-caption">
        DG Clinic — {CLINIC_ADDRESS}. By appointment only.
      </p>
    </div>
  );
}
