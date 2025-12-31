import datetime
from decimal import Decimal
from models.base import Base
from models.type import Type
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, DateTime, Numeric, Integer

class Product(Base):
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(Integer, primary_key = True, autoincrement=True)
    sku: Mapped[str] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255))
    source: Mapped[str] = mapped_column(String(255))
    type_id: Mapped[int] = mapped_column(Integer)
    start_date: Mapped[datetime.datetime] = mapped_column(DateTime)
    active: Mapped[bool] = mapped_column(Boolean)
    regular_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    sale_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    on_sale: Mapped[bool] = mapped_column(Boolean)
    url: Mapped[str]	= mapped_column(String(255))
    customer_review_count: Mapped[int] = mapped_column(Integer)
    customer_review_average: Mapped[Decimal] = mapped_column(Numeric(3, 2))
    # class = self.class
    class_id: Mapped[int] = mapped_column(String(255))
    sub_class: Mapped[str] = mapped_column(String(255))
    tv_type: Mapped[str] = mapped_column(String(255))