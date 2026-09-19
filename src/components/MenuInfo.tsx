"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { euro } from "@/lib/menu";
import menu from "@/data/menu.json";
import styles from "@/app/menu/Menu.module.css";

export default function MenuInfo() {
  return (
    <section
      className={`container ${styles.menuInfo}`}
      aria-labelledby="menu-info-title"
    >
      <div>
        <p className="eyebrow">Prima di ordinare</p>
        <h2 id="menu-info-title">Le cose da sapere.</h2>
        <p>Per qualsiasi esigenza, parlane con noi.</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="allergeni">
          <AccordionTrigger>Allergie e intolleranze</AccordionTrigger>
          <AccordionContent>
            Rivolgiti al personale prima di ordinare per conoscere gli allergeni
            presenti e le possibili contaminazioni. Le associazioni ai singoli
            piatti non sono ancora verificate dal ristorante, perciò non vengono
            presentate come indicazioni di idoneità.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="coperto">
          <AccordionTrigger>Coperto e aggiunte</AccordionTrigger>
          <AccordionContent>
            {menu.costiAggiuntivi.coperto.visibile && (
              <p>
                Coperto: {euro.format(menu.costiAggiuntivi.coperto.prezzo)} a
                persona.
              </p>
            )}
            <p>{menu.costiAggiuntivi.aggiuntePizze.descrizione}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="prodotti">
          <AccordionTrigger>Informazioni sui prodotti</AccordionTrigger>
          <AccordionContent>
            Il menu riporta una nota sui prodotti surgelati senza associarla a
            singole voci. Chiedi al personale informazioni sui piatti che
            desideri ordinare.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
