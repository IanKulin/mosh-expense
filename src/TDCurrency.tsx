
interface TDCurrencyProps {
    children: number;
    fontWeight?: string;
  }

function TDCurrency({children, fontWeight = "normal"}:TDCurrencyProps) {
  return (
    <td style={{ textAlign: "right", fontWeight: fontWeight }}>
      $
      {children.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </td>
  );
}


export default TDCurrency;
