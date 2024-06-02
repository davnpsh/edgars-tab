interface Props {
  qty: number;
  name: string;
  price: number;
  amt: number;
}

export default function Item({ qty, name, price, amt }: Props) {
  return (
    <tr>
      <td className="text-left align-top">{qty}</td>
      <td className="text-left align-top">{name}</td>
      <td className="text-right align-top">${price}</td>
      <td className="text-right align-top">{amt}</td>
    </tr>
  );
}
