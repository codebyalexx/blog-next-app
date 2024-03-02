"use client";

import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { toggleFeature } from "@/src/action/features.action";
import { ShieldAlertIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const FeaturesTab = ({ features }: { features: any }) => {
  const [loading, startTransition] = useTransition();
  const [featuresState, setFeaturesState] = useState(features.data || {});

  const handleChange = async (checked: boolean, feature: string) => {
    startTransition(async () => {
      const res = await toggleFeature(feature);

      if (res.success) {
        toast.success(`Successfully toggled ${feature} feature!`);
        setFeaturesState({
          ...featuresState,
          [feature]: checked,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <TabsContent value="features">
      {features.success === false && (
        <div className="my-4 border-2 border-border p-4 rounded-lg flex items-center gap-2">
          <ShieldAlertIcon /> {features.message || "Unknown error has occurred"}
        </div>
      )}

      {features.success && (
        <>
          <h2 className="text-2xl font-bold mb-4">Features Flags</h2>
          <ul>
            {Object.keys(featuresState).map((feature: string) => (
              <li key={feature} className="flex items-center gap-2 mb-4">
                {loading ? (
                  <Loader />
                ) : (
                  <Switch
                    id={feature}
                    name={feature}
                    checked={featuresState[feature] || false}
                    onCheckedChange={(checked: boolean) =>
                      handleChange(checked, feature)
                    }
                  />
                )}
                <Label htmlFor={feature} className="text-base capitalize">
                  {feature}
                </Label>
              </li>
            ))}
          </ul>
        </>
      )}
    </TabsContent>
  );
};
