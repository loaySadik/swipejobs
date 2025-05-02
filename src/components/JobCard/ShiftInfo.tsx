import { formatShiftDate } from "@/api";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Separator, Text, XStack, YStack } from "tamagui";

interface ShiftObject {
  startDate: string;
  endDate: string;
}

interface ShiftInfoProps {
  shifts: (ShiftObject | string | number)[];
}

// Helper to check if a shift is an object with startDate and endDate
const isShiftObject = (
  shift: ShiftObject | string | number
): shift is ShiftObject => {
  return (
    typeof shift === "object" &&
    shift !== null &&
    "startDate" in shift &&
    "endDate" in shift
  );
};

export const ShiftInfo = ({ shifts }: ShiftInfoProps) => {
  return (
    <>
      <XStack gap="$3" alignItems="center">
        <Ionicons name="calendar" size={24} color="black" />
        <YStack>
          <Text fontWeight="600">Shift Dates</Text>
          {shifts && shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <Text key={index} fontSize={14}>
                {isShiftObject(shift)
                  ? formatShiftDate(shift.startDate, shift.endDate)
                  : String(shift)}
              </Text>
            ))
          ) : (
            <Text fontSize={14}>No shifts scheduled</Text>
          )}
        </YStack>
      </XStack>
      <Separator />
    </>
  );
};
