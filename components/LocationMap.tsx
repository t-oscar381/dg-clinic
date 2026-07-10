import { CLINIC_AREA, clinicMapEmbedUrl } from "@/lib/site";

export default function LocationMap() {
  return (
    <div>
      <div className="location-map">
        <iframe
          title={`DG Clinic — ${CLINIC_AREA}`}
          src={clinicMapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={false}
        />
      </div>
      <p className="location-caption">
        Visit us at DG Clinic — {CLINIC_AREA}. By appointment only.
      </p>
    </div>
  );
}
